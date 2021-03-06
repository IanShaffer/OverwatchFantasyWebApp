import React from 'react';
import './news-view.scss';
export default props =>
    <div className="container-dashboard">
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
            <div className="panel panel-default panel-transparent">
                <div className="panel-heading">
                    <h3>News</h3>
                </div>
                <div className="panel-body">
                    <h2>April 6th, 2019</h2>
                    <p className="news-text">It's been a while and we've been very busy. Sorry.</p>
                    <p className="news-text">We have updated the site to handle Season 2. Live stats won't be working for now.</p>
                    <p className="news-text">We will not be locking the roster for the time being. This means that you are awarded points whenever we happen to calcualate the points for a given game. This is not a great way of doing things. Hopefully, we will get around to taking a snapshot of everyones' rosters every week so that we can award points based on your roster at a certain moment in time.</p>
                </div>
                <div className="panel-body">
                    <h2>April 26th, 2018</h2>
                    <p className="news-text">Greetings Everyone. We have finally completed creating the live-feed page where you can see how many points you have accrued for every match!</p>
                    <p className="news-text">Please select the "Live" link on the navigation bar. As the Overwatch League games are played, you will be able to see instant updates from the kills that happen in-game, and it will also tell you how many points you will earn from that kill. </p>
                    <p className="news-text">Keep in mind that our new data allocation process is still in its development phase, so your points will still be showing up on your account a day late in order to make sure everything is being calculated as it should. Although, we should hopefully be able to provide you with instant points in the near future.</p>
                    <p className="news-text">Feel free to also use the chat module to interact with the other users. You will be able to see chat history now.</p>
                </div>
                <div className="panel-body">
                    <h2>April 24th, 2018</h2>
                    <p className="news-text">Greetings everyone. Schedule page is now live! You should be able to access it through your dashboard.  </p>
                    <p className="news-text">Clicking on "stats" button of the maps will give you details of the kills, deaths, and points youve gained in that game map.  </p>
                    <p className="news-text">Let us know what you think about the schedule page! </p>
                    <p className="news-text">We've also gotten a couple of requests about recovering their accounts, so we've decided to implement a password reset. Please click on "Forgot your password" on the login screen to start the password reset process.  </p>
                    <p className="news-text">We are very close to deploying a live-feed of in-game kills, stay tuned! </p>
                </div>
                <div className="panel-body">
                    <h2>April 18th, 2018</h2>
                    <p className="news-text">Greetings everyone. We are designingprogramming, and testing new things by day and night. </p>
                    <p className="news-text">First things first, We have added an ability to retain chat history so we are able to view your feedbacks, as well as the dank memes from your peers. </p>
                    <p className="news-text">The next upcoming feature we are working on is a schedule page to your dashboard, where you will be able to view your past matches and see how you've received points, because everyone loves data. </p>
                    <p className="news-text">We will also deploy a cool feature soon where you will be able to watch your games live while getting the points as players make kills. </p>
                    <p className="news-text">We have made some database migrations, and thus some things might not work as intended. Please, please, please, if you have any issues, send us a feedback, or leave a message in the chat! </p>
                    <p className="news-text">Until then, see you soon! </p>
                </div>
                <div className="panel-body">
                    <h2>April 15th, 2018</h2>
                    <p className="news-text">We discovered that there were some innaccurate points given to users during the first week of Stage 3 of OWL.</p>
                    <p className="news-text">We have removed those points, and so you might notice your point total has dropped.</p>
                    <p className="news-text">We apologize if this is frustrating, but points should now be accurate.</p>
                </div>
                <div className="panel-body">
                    <h2>April 11th, 2018</h2>
                    <p className="news-text">Added new live page for watching OWL while chatting with other fantasy players.</p>
                    <p className="news-text">Live fantasy stats will be added to the live OWL page soon.</p>
                    <p className="news-text">Weekly leaderboard added.</p>
                </div>
                <div className="panel-body">
                    <h2>April 10th, 2018</h2>
                    <p className="news-text">Leaderboard no longer takes forever to load.</p>
                    <p className="news-text">Added a chat module.</p>
                    <p className="news-text">Can report issues now on roster page.</p>
                    <p className="news-text">Roster page now shows user's total points and rank.</p>
                    <p className="news-text">Player pictures should now be accurate.</p>
                    <p className="news-text">Wrestle with Jeff, prepare for death.</p>
                    <p className="news-text">Making progress on live stats. They are working but they are a bit innaccurate.</p>
                </div>
                <div className="panel-body">
                    <h2>April 5th, 2018</h2>
                    <p className="news-text">Points for Wednesday have been calculated.</p>
                    <p className="news-text">Working on a stats page to display your point gains.</p>
                    <p className="news-text">Working on a way to update the points more quickly. 24 hour turnaround isn't fantastic. Hopefully we can get the stats live.</p>
                    <p className="news-text">Working on custom leagues.</p>
                </div>
                <div className="panel-body">
                    <h2>April 4th, 2018</h2>
                    <p className="news-text">Apologies for all the server restarts. We've been working on database things. That will be happening much less frequently from here
                        on out, if at all. We've been developing like mad. We should have some great features out soon. We have
                    a lot in the works. </p>

                    <p className="news-text">What we're most excited for is chat features and custom leagues. Good luck with your
                        picks this week! If you get bored, just remember that we'll have custom leagues up soon, which will be much more
                    interesting.</p>
                </div>
                <div className="panel-body">
                    <h2>April 1st, 2018</h2>
                    <p className="news-text">This Website is currently in beta.</p>
                    <p className="news-text">Personal Leagues coming soon. They will have trades, subs, draft, etc.</p>
                    <p className="news-text">The global league will be locked from Wednesday-Sunday, so get your picks in on
                Monday or Tuesday. Points will be awarded per game.</p>
                    <p className="news-text">We are developing rapidly. Expect quick updates. Email us with any suggestions or critiques:</p>
                    <p className="news-text">OverwatchFantasy@tutanota.com</p>
                </div>
                <div className="panel-body">
                    <h2>March 29th, 2018 </h2>
                    <p className="news-text">Site is up and running. Welcome, welcome! </p>
                </div>
            </div>
        </div>
    </div>