import React from 'react';
import './about-view.scss';
export default props =>
    <div class="container-dashboard">
        <div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <div class="panel panel-default panel-transparent">
                <div class="panel-heading">
                    <h3>About</h3>
                </div>
                <div class="panel-body about-text">
                    <div>
                        We are overwatch enthusiasts that enjoy full-stack development.
                    </div>
                    <div class="dev-profile">
                        <img class="dev-icon" src="/images/hero_icons/genji.png" />
                        <h4>Charlie Oh</h4>
                        <p>UCI Alumni </p>
                        <p>Programmer Analyst</p>
                        <p>Application Developer</p>
                        <p>Database Administrator</p>
                        <p>Genji Main</p>
                        <p>mun5424@gmail.com</p>
                    </div>
                    <div class="dev-profile">
                        <img class="dev-icon" src="/images/hero_icons/tracer.png" />
                        <h4>Ian Shaffer </h4>
                        <p>Full-Stack Developer</p>
                        <p>Application Developer</p>
                        <p>Database Administrator</p>
                        <p>Tracer Main</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
