
module.exports = {
    getPlayerIdFromName, getTeamNameFromTeamId,
    getRoleFromPlayerId, mapOnId,
    getHeroIdFromName, getMapIdFromOwlName,
    getMatchIdFromOwlMatchId, getMapIdFromOwlMapGuid,
    getWeightFromHeroId
};

// Get playerId from name
function getPlayerIdFromName(playersArray, name) {
    for (var x = 0; x < playersArray.length; x++) {
        if (playersArray[x].name.toLowerCase() === name.toLowerCase()) {
            return playersArray[x].id;
        }
    }
    return false;
};

// Get heroId from name
function getHeroIdFromName(heroesArray, name) {
    for (var x = 0; x < heroesArray.length; x++) {
        if (heroesArray[x].hero_name.toLowerCase() === name.toLowerCase()) {
            return heroesArray[x].id;
        }
    }
    return false;
};

// Get teamName from teamId
function getTeamNameFromTeamId(teamsArray, teamId) {
    for (var t = 0; t < teamsArray.length; t++) {
        if (teamsArray[t].id == teamId) {
            return teamsArray[t].name;
        }
    }
    return false;
};

// Get role from playerId
function getRoleFromPlayerId(playersArray, playerId) {
    for (var m = 0; m < playersArray.length; m++) {
        if (playersArray[m].id == playerId) {
            return playersArray[m].role.toLowerCase();
        }
    }
    return false;
};

// Get mapId from owlName
function getMapIdFromOwlName(mapsArray, owlName) {
    for (var x = 0; x < mapsArray.length; x++) {
        if (mapsArray[x].owl_name.toLowerCase() === owlName.toLowerCase()) {
            return mapsArray[x].id;
        }
    }
    return false;
};

// Get mapId from owlMapGuid
function getMapIdFromOwlMapGuid(mapsArray, owlMapGuid) {
    for (var x = 0; x < mapsArray.length; x++) {
        if (mapsArray[x].owl_mapGuid === owlMapGuid) {
            return mapsArray[x].id;
        }
    }
    return false;
};

// Get maptchId from owlMatchId
function getMatchIdFromOwlMatchId(matchesArray, owlMatchId) {
    for (var x = 0; x < matchesArray.length; x++) {
        if (matchesArray[x].owl_id == owlMatchId) {
            return matchesArray[x].id;
        }
    }
    return false;
};

// Get weight from heroId
function getWeightFromHeroId(weightsArray, heroId) {
    for (var x = 0; x < weightsArray.length; x++) {
        if (weightsArray[x].hero_id == heroId) {
            return weightsArray[x].kill_weight;
        }
    }
    return false;
};

function mapOnId(array) {
    var map = new Map();
    for (var x = 0; x < array.length; x++) {
        var item = array[x];
        map.set(item.id, item);
    }
    return map;
}

function mapOnName(array) {
    var map = new Map();
    for (var x = 0; x < array.length; x++) {
        var item = array[x];
        map.set(item.id, item);
    }
    return map;
}
