var request = require("request");
var https = require('https');
var fs = require('fs');
var db = require('../models');
var moment = require('moment');

var utility = require("./utility.js");

module.exports = { gateway, root, rosterLockTrue, rosterLockFalse, playerPics, seedWeights, seedLeaderboard, seedWeeklyLeaderboard };

function gateway(req, res, next) {
    if ((req.user && req.user.access_level === 1) || req.hostname == 'localhost') {
        next();
        return;
    }
    res.redirect("/");
}

function root(req, res) {
    db.findOneRowWithColumnValue("globals", "key", "rosterLock", function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        if (result) {
            var rosterLock = result.value;
            if (rosterLock === "true") {
                var data = { rosterLock: true };
            } else {
                var data = {};
            }
            res.render("admin", data);
        } else {
            res.render("admin", { message: "No rosterLock global" });
        }
    });
}

function rosterLockTrue(req, res) {
    var data = {
        value: "true"
    };
    var constraint = {
        key: "rosterLock"
    };
    db.update("globals", data, constraint, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/admin");
    });
}

function rosterLockFalse(req, res) {
    var data = {
        value: "false"
    };
    var constraint = {
        key: "rosterLock"
    };
    db.update("globals", data, constraint, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/admin");
    });
}

function playerPics(req, res) {
    var failures = [];
    db.findAllRows("players", function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        var playersArray = results;
        if (results.length === 0) {
            res.render("admin", { message: "No Players in Players DB." });
            return;
        }
        request('https://api.overwatchleague.com/teams', function (error, response, body) {
            if (error) {
                res.render("admin", { message: "Error duing owl/teams call" });
                return;
            }
            var teams = JSON.parse(body).competitors;
            if (teams.length === 0) {
                res.render("admin", { message: "No teams from owl call" });
                return;
            }
            for (var t = 0; t < teams.length; t++) {
                try {
                    var players = teams[t].competitor.players;
                } catch (err) {
                    res.render("admin", { message: "Couldn't grab players from owl team object" });
                    return;
                }
                for (var p = 0; p < players.length; p++) {
                    try {
                        var headshotUrl = players[p].player.headshot;
                    } catch (err) {
                        res.render("admin", { message: "Error while grabbing player headshot." });
                        return;
                    }
                    try {
                        var name = players[p].player.name;
                    } catch (err) {
                        res.render("admin", { message: "Error while grabbing player name." });
                        return;
                    }
                    var playerId = utility.getPlayerIdFromName(playersArray, name);
                    if (!playerId) {
                        name = name.replace(/o/g, "0");
                        playerId = utility.getPlayerIdFromName(playersArray, name);
                    }
                    if (playerId) {
                        (function () {
                            try {
                                var dir = "./client/images/player_headshots";
                                if (!fs.existsSync(dir)) {
                                    fs.mkdirSync(dir);
                                }
                                var file = fs.createWriteStream(dir + "/" + playerId + ".png");
                                if (headshotUrl) {
                                    var request = https.get(headshotUrl, function (response) {
                                        response.pipe(file);
                                    });
                                } else {
                                    var readStream = fs.createReadStream("./client/images/no_headshot.png");
                                    readStream.pipe(file);
                                }
                                
                            } catch (err) {
                                failures.push("Error while writing file stream for player headshot.");
                            }
                        })();
                        (function () {
                            try {
                                var dir = "./build/client/images/player_headshots";
                                if (!fs.existsSync(dir)) {
                                    fs.mkdirSync(dir);
                                }
                                var file = fs.createWriteStream(dir + "/" + playerId + ".png");
                                if (headshotUrl) {
                                    var request = https.get(headshotUrl, function (response) {
                                        response.pipe(file);
                                    });
                                } else {
                                    var readStream = fs.createReadStream("./build/client/images/no_headshot.png");
                                    readStream.pipe(file);
                                }
                            } catch (err) {
                                failures.push("Error while writing file stream for player headshot.");
                            }
                        })();
                    }
                }
            }
            if (failures.length > 0) {
                res.render("admin", { message: "Failures while filling players table: " + failures });
            } else {
                res.render("admin", { message: "No failures while updating player pics." });
            }
            return;
        });
    });
};

function seedWeights(req, res) {
    db.findAllRows("heroes", function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        var heroRes = result;
        for (var h = 0; h < heroRes.length; h++) {
            var hero = heroRes[h];
            var insertObj = {
                hero_id: hero.id,
                map_id: 1,
                kill_weight: parseFloat((1 / hero.kpm * 10).toFixed(4)),
                death_weight: parseFloat((1 / hero.dpm * 10).toFixed(4))
            };
            if (insertObj.kill_weight >= 100) {
                insertObj.kill_weight = 97.5102;
            }
            db.insert("weights", insertObj, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                }
            });
        }
        res.render("admin", { message: "Successfully seeded weights table." });
    });
};

function seedLeaderboard(req, res) {
    var users = [];
    db.findAllRows("players", function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        var players = results;
        if (players.length === 0) {
            error = "No player data.";
            res.render('admin', { message: error });
            return;
        }
        db.findAllRows("users", function (error, userResults) {
            if (error) {
                console.log(error);
                return;
            }
            if (userResults.length === 0) {
                error = "No user data.";
                res.render('admin', { message: error });
                return;
            }
            for (var u = 0; u < userResults.length; u++) {
                (function () {
                    var uIndex = u;
                    var user = userResults[u];
                    setTimeout(function () {
                        var constraint = {
                            user_id: user.id
                        }
                        db.findAllWithConstraint("rosters", constraint, "ORDER BY position asc", function (error, results) {
                            if (error) {
                                console.log(error);
                                return;
                            }
                            var tempRoster = results;
                            var userTotalPoints = 0;
                            var roster = [];
                            for (var t = 0; t < tempRoster.length; t++) {
                                var id = tempRoster[t].player_id;
                                if (id) {
                                    var found = players.find(function (element) {
                                        return element.id === id;
                                    });
                                    var playerName = found.name;
                                    var id = found.id;
                                    var inactive = found.inactive;
                                    var toPush = {
                                        id: id,
                                        name: playerName,
                                        inactive: inactive
                                    };
                                    if (id === 130) {
                                        toPush.jeff = true;
                                    }
                                    roster.push(toPush);
                                }
                            }
                            var constraint = {
                                user_id: user.id
                            }
                            db.findAllWithConstraint("points", constraint, "", function (error, results) {
                                if (error) {
                                    console.log(error);
                                    return;
                                }
                                var points = results;
                                var userTotalPoints = 0;
                                for (var o = 0; o < points.length; o++) {
                                    userTotalPoints += points[o].points;
                                }
                                var newUser = {
                                    username: user.username,
                                    id: user.id,
                                    totalPoints: parseFloat(userTotalPoints.toFixed(2)),
                                    roster: roster
                                };
                                users.push(newUser);
                                if (users.length === userResults.length) {
                                    function compare(a, b) {
                                        if (a.totalPoints > b.totalPoints)
                                            return -1;
                                        if (a.totalPoints < b.totalPoints)
                                            return 1;
                                        return 0;
                                    }
                                    users.sort(compare);
                                    for (var u = 0; u < users.length; u++) {
                                        (function () {
                                            var rank = u + 1;
                                            var user = users[u]
                                            setTimeout(function () {
                                                var constraint = {
                                                    leaderboard_name: "global",
                                                    rank: rank
                                                }
                                                db.findOneWithConstraint("leaderboards", constraint, "", function (error, result) {
                                                    if (error) {
                                                        console.log(error);
                                                        return;
                                                    }
                                                    if (result) {
                                                        var updateObj = {
                                                            points: user.totalPoints,
                                                            username: user.username,
                                                            user_id: user.id,
                                                            roster: JSON.stringify(user.roster)
                                                        };
                                                        var constraintObj = {
                                                            leaderboard_name: "global",
                                                            rank: rank
                                                        };
                                                        db.update("leaderboards", updateObj, constraintObj, function (error, result) {
                                                            if (error) {
                                                                console.log(error);
                                                                return;
                                                            }
                                                        });
                                                    } else {
                                                        var insertObj = {
                                                            leaderboard_name: "global",
                                                            rank: rank,
                                                            points: user.totalPoints,
                                                            username: user.username,
                                                            user_id: user.id,
                                                            roster: JSON.stringify(user.roster)
                                                        };
                                                        db.insert("leaderboards", insertObj, function (error, result) {
                                                            if (error) {
                                                                console.log(error);
                                                                return;
                                                            }
                                                        });
                                                    }
                                                });
                                            }, u * 100);
                                        })();
                                    }
                                    res.render("admin", { message: "Leadboard Seed finished." });
                                }
                            });
                        });
                    }, 1000 * uIndex);
                })();
            }
        });
    });
}

function seedWeeklyLeaderboard(req, res) {
    var week = 604800000;
    var nowDate = Date.parse(new Date());
    var weekAgo = nowDate - week;
    var weekAgoParsed = new Date(weekAgo);
    var users = [];
    db.findAllRows("players", function (error, results) {
        if (error) {
            console.log(error);
            return;
        }
        var players = results;
        if (players.length === 0) {
            error = "No player data.";
            res.render('admin', { message: error });
            return;
        }
        db.findAllRows("users", function (error, userResults) {
            if (error) {
                console.log(error);
                return;
            }
            if (userResults.length === 0) {
                error = "No user data.";
                res.render('admin', { message: error });
                return;
            }
            for (var u = 0; u < userResults.length; u++) {
                (function () {
                    var uIndex = u;
                    var user = userResults[u];
                    setTimeout(function () {
                        var constraint = {
                            user_id: user.id
                        }
                        db.findAllWithConstraint("rosters", constraint, "ORDER BY position asc", function (error, results) {
                            if (error) {
                                console.log(error);
                                return;
                            }
                            var tempRoster = results;
                            var userTotalPoints = 0;
                            var roster = [];
                            for (var t = 0; t < tempRoster.length; t++) {
                                var id = tempRoster[t].player_id;
                                if (id) {
                                    var found = players.find(function (element) {
                                        return element.id === id;
                                    });
                                    var playerName = found.name;
                                    var id = found.id;
                                    var inactive = found.inactive;
                                    var toPush = {
                                        id: id,
                                        name: playerName,
                                        inactive
                                    };
                                    if (id === 130) {
                                        toPush.jeff = true;
                                    }
                                    roster.push(toPush);
                                }
                            }
                            var constraint = ""
                            db.customizedQuery("SELECT * FROM ?? WHERE ??=? AND ?? >= ? ", 
                                [`points`, `user_id`, user.id, `createdAt`, moment.utc(weekAgoParsed).format('YYYY-MM-DD HH:mm:ss')],
                                function (error, results) {
                                    if (error) {
                                        console.log(error);
                                        return;
                                    }
                                    var points = results;
                                    var userTotalPoints = 0;
                                    for (var o = 0; o < points.length; o++) {
                                        userTotalPoints += points[o].points;
                                    }
                                    var newUser = {
                                        username: user.username,
                                        id: user.id,
                                        totalPoints: parseFloat(userTotalPoints.toFixed(2)),
                                        roster: roster
                                    };
                                    users.push(newUser);
                                    if (users.length === userResults.length) {
                                        function compare(a, b) {
                                            if (a.totalPoints > b.totalPoints)
                                                return -1;
                                            if (a.totalPoints < b.totalPoints)
                                                return 1;
                                            return 0;
                                        }
                                        users.sort(compare);
                                        for (var u = 0; u < users.length; u++) {
                                            (function () {
                                                var rank = u + 1;
                                                var user = users[u]
                                                setTimeout(function () {
                                                    var constraint = {
                                                        leaderboard_name: "global_weekly",
                                                        rank: rank
                                                    }
                                                    db.findOneWithConstraint("leaderboards", constraint, "", function (error, result) {
                                                        if (error) {
                                                            console.log(error);
                                                            return;
                                                        }
                                                        if (result) {
                                                            var updateObj = {
                                                                points: user.totalPoints,
                                                                username: user.username,
                                                                user_id: user.id,
                                                                roster: JSON.stringify(user.roster)
                                                            };
                                                            var constraintObj = {
                                                                leaderboard_name: "global_weekly",
                                                                rank: rank
                                                            };
                                                            db.update("leaderboards", updateObj, constraintObj, function(error, result) {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return;
                                                                }
                                                            });
                                                        } else {
                                                            var insertObj = {
                                                                leaderboard_name: "global_weekly",
                                                                rank: rank,
                                                                points: user.totalPoints,
                                                                username: user.username,
                                                                user_id: user.id,
                                                                roster: JSON.stringify(user.roster)
                                                            };
                                                            db.insert("leaderboards", insertObj, function(error, result) {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return;
                                                                }
                                                            });
                                                        }
                                                    });
                                                }, u * 100);
                                            })();
                                        }
                                        res.render("admin", { message: "Leadboard Seed finished." });
                                    }
                                });
                        });
                    }, 1000 * uIndex);
                })();
            }
        });
    });
};