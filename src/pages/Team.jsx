import React from "react";
import linkedin from "../assets/linkedin.png";
import cto_photo from "../assets/cto_photo.png";
import gmail from "../assets/gmail.png";
import swati from "../assets/swati.jpg";
import intern_photo from "../assets/intern_photo.jpg";
import hr from "../assets/hr.jpeg";

function Team() {
  return (
    <div className="content-wrapper">
      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Professional Team</h2>
        <p className="team-intro">
          We have a diverse and talented group of professionals who are passionate about delivering excellence in every project.
        </p>

        <div className="team-container">

          {/* Team Member 1 */}
          <div className="team-member">
            <div className="team-member-photo">
            <img
                  src={cto_photo}
                  alt="CTO Photo"
                />
            </div>
            <div className="team-member-info">
              <h3>Ujjwal Kulshrestha</h3>
              <p className="position">Founder</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/ujjwal-kulshrestha/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                  src={linkedin}
                  alt="LinkedIn"
                />
                </a>
                <a href="mailto:ujjwalkul7@gmail.com">
                <img
                  src={gmail}
                  alt="Gmail"
                />
                </a>
              </div>
              <p className="bio">
                Ujjwal Kulshrestha, currently pursuing a B.Tech in Information Technology from the Indian Institute of Information Technology, Una, is the Chief Technology Officer at URBAN GRIH. 
                Alongside his leadership role, Ujjwal has a strong passion for designing floor plans, combining his technical expertise with his creative vision. 
                His ability to integrate innovative technology solutions with architectural design helps URBAN GRIH deliver cutting-edge digital platforms for clients.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <div className="team-member-photo">
            <img
                  src={swati}
                  alt="Swati Chauhan"
                />
            </div>
            <div className="team-member-info">
              <h3>Swati Chauhan</h3>
              <p className="position">Co-Founder</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/swatidigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                  src={linkedin}
                  alt="LinkedIn"
                />
                </a>
                <a href="mailto:swati.chauhan15@gmail.com">
                <img
                  src={gmail}
                  alt="Gmail"
                />
                </a>
              </div>
              <p className="bio">
                Swati Chauhan is a professional with over 15 years of experience in the field of Digital Marketing. 
                Currently serving as the Vice President of Digital Marketing at USMLESarthi, Swati is a dedicated and accomplished leader in the industry. 
                Her extensive expertise spans various aspects of digital marketing.
              </p>
            </div>
          </div>

          <div className="team-member">
            <div className="team-member-photo">
            <img
                  src={intern_photo}
                  alt="CTO Photo"
                />
            </div>
            <div className="team-member-info">
              <h3>Aman Maurya</h3>
              <p className="position">Web Developer Intern</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/amanmaurya211/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                  src={linkedin}
                  alt="LinkedIn"
                />
                </a>
                <a href="mailto:amankashipur1234@gmail.com">
                <img
                  src={gmail}
                  alt="Gmail"
                />
                </a>
              </div>
              <p className="bio">
              Aman Maurya, currently pursuing a B.Tech in Information Technology from the Indian Institute of Information Technology, Una, is working as a Web Developer Intern.
Alongside his internship role, Aman has a strong passion for learning new technologies and continuously expanding his technical skill set.
He enjoys implementing his knowledge through real-world projects, focusing on building practical, efficient, and user-centric web solutions that reflect both his curiosity and commitment to growth.
              </p>
            </div>
          </div>

          <div className="team-member">
            <div className="team-member-photo">
            <img
                  src={hr}
                  alt="HR Photo"
                />
            </div>
            <div className="team-member-info">
              <h3>Disha</h3>
              <p className="position">Marketing Intern</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/disha-697641287?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                  src={linkedin}
                  alt="LinkedIn"
                />
                </a>
                <a href="mailto:chdisha702ch@gmail.com">
                <img
                  src={gmail}
                  alt="Gmail"
                />
                </a>
              </div>
              <p className="bio">
              I am a Bachelor of Business Administration (BBA) student currently working as a Marketing Intern at Urban Grih. In this role, I support marketing initiatives focused on brand building and audience engagement while gaining hands-on experience through real-world projects.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Team;
