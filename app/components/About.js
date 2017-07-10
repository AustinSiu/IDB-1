var React = require('react');

class About extends React.Component {
  render() {
    return (
      <div className="about">
              <div className="container">
                <h2 className="title">Motivation</h2>
                <p className="subdesc">Our team was motivated to create an IMDb-like application for everything you need to know about artists and music. We were inspired by Spotify and came into realization that there needs to be a main place where people can find simple and quick information about an artist’s biography, discography, and tour dates. Our website is named “BandDB”, which stands for Band Database. We believe this website will be useful for music lovers and others alike who want to learn a little bit more about their favorite bands and artists.</p>
                <h3 className="subtitle">Group Name: Wiggity Wack</h3>
                <h3 className="subtitle">Group Members: </h3>
                  <h1> <img src = "images/devs/djp.jpg"></img></h1>
                    <p className="subdesc" >I am Jonathan! I am a CS major with one year left before I graduate (i.e. I'm a Senior now I guess.)
                    I've started programming since around highschool and have loved it ever since.</p>
                  <li> - no. of commits: 27</li>
                  <li> - no. of issues: 8</li>
                  <li> - no. of unit tests: 22</li>
                  <h1> <img src = "images/devs/tl.jpg"></img></h1>
                    <p className="subdesc" >Apiary, Data Scraping, Flask Templates, React</p>
                  <li> - no. of commits: 23</li>
                  <li> - no. of issues: 4</li>
                  <li> - no. of unit tests: 0</li>
                  <h1> <img src = "images/devs/ss.jpg"></img></h1>
                    <p className="subdesc" >I am Shida. I study and research physics. I am also an enthusiastic coder.</p>
                  <li> - no. of commits: 24</li>
                  <li> - no. of issues: 8</li>
                  <li> - no. of unit tests: 0</li>
                  <h1> <img src = "images/devs/sb.jpg"></img></h1>
                    <p className="subdesc" >I'm a fourth year Computer Science major at UT. I also have a minor in Spanish and Business.</p>
                  <li> - no. of commits: 9</li>
                  <li> - no. of issues: 5</li>
                  <li> - no. of unit tests: 0</li>
                  <h1> <img src = "images/devs/mc.jpg"></img></h1>
                    <p className="subdesc" >University of Texas Junior with a strong passion for everything music, tech, business, and design. Free time spent studying business tactics, working on my startup ConcertCam, playing open mic nights, and building innovative musical hardware.</p>
                  <li> - no. of commits: 9</li>
                  <li> - no. of issues: 2</li>
                  <li> - no. of unit tests: 0</li>

                <h3 className="subtitle">Statistics </h3>
                  <li> - total no. of commits: 77</li>
                  <li> - total no. of issues: 27</li>
                  <li> - total no. of unit tests: 77</li>
                  <li> - <b>Apiary API</b>: <a href="https://docs.djpeacher.apiary.io">https://docs.djpeacher.apiary.io</a></li>
                  <li> - <b>GitHub Repo</b>: <a href="https://github.com/djpeacher/IDB">https://github.com/djpeacher/IDB</a></li>
                  <li> - <b>Trello</b>: <a href="https://trello.com/b/Xa3QhO2b/idb1">https://trello.com/b/Xa3QhO2b/idb1</a></li>

                <h3 className="subtitle">Data </h3>
                  <li> - <a href="https://en.wikipedia.org/w/api.php">https://en.wikipedia.org/w/api.php</a></li>
                  <li> - <a href="https://developer.spotify.com/web-api/">https://developer.spotify.com/web-api/</a></li>
                  <li> - Phase 1: Since we only needed 3 instances of each model, data scraping was done manually.</li>
                  <li> - Phase 2-4: Data scraping was done automatically.</li>
                    <h3 className="Title">Tools </h3>
                  <h3 className="subtitle">Hosting </h3>
                          <li> - AWS EC2 - Elastic Compute Cloud is a web service that provides computing capacity from Amazon's cloud.</li>
                          <li> - Namecheap - the domain name registrar from which we obtained our banddb.me domain.</li>
                  <h3 className="subtitle">API </h3>
                          <li> - Apiary - A Github tool that we used to document our API.</li>
                  <h3 className="subtitle">GUI </h3>
                          <li> - Bootstrap - A free and open-source front-end web framework for designing websites and web applications. It contains HTML- and CSS-based design templates as well as optional JavaScript extensions. We used Bootstrap throughout our website to style and format our data.</li>
                  <h3 className="subtitle">Frontend </h3>
                          <li> - JavaScript - Is a high-level, dynamic, untyped, interpreted run-time language. We used JavaScript with Bootstrap to design the front-end of our web application.</li>
                          <li> - CSS 3 - The 3rd version of CSS, a style sheet language used for describing the presentation of a document written in a markup language. We used this with Bootstrap to style our web application.</li>
                          <li> - HTML 5 - The 5th version of HTML, the standard markup language for creating web pages and web applications. We used this with Bootstrap for the front-end of our web application.</li>
                  <h3 className="subtitle">Other </h3>
                          <li> - Github - A web-based version control repository that our team used to maintain our source code.</li>
                          <li> - Slack - A communication tool our team used to collaborate over the course of the project. Slack is also connected to the Github repository, which allowed us to monitor the commits of individual team members and the overall progress of the team.</li>
                          <li> - Trello - A project management application that our team used to list and categorize the necessary tasks for developing our web application. It allowed us to track the progress of our team over the course of the project.</li>
                          <li> - PlanitPoker - An online application that provides an interface for Agile project teams to estimate the complexity or completion time of projects. Our team used this application to break each phase of our project into tasks and estimate the time each task would require.</li>
                  <li> - Report: <a href="https://utexas.box.com/s/kb82xlo3opqrp8ral25m8bmn8l68hp19">https://utexas.box.com/s/kb82xlo3opqrp8ral25m8bmn8l68hp19</a></li>
              </div>
        </div>
    )
  }
}

module.exports = About;
