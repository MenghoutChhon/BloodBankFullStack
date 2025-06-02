import React from 'react';
import chhonImg from '../../../assets/team/chhon_menghout.png';
import boImg from '../../../assets/team/bo_sane.png';
import chumImg from '../../../assets/team/chum_rathanakchantrai.png';
import solitaImg from '../../../assets/team/chhorn_solita.png';
import sreytochImg from '../../../assets/team/en_sreytoch.png';
import './Team.css';

const Team: React.FC = () => (
  <div className="team-grid">
    <div>
      <img src={chhonImg} alt="Chhon Menghout" className="team-img" />
      <h3>Mr. Chhon Menghout</h3>
      <p>Project Manager</p>
    </div>
    <div>
      <img src={boImg} alt="Bo Sane" className="team-img" />
      <h3>Ms. Bo Sane</h3>
      <p>Frontend Developer</p>
    </div>
    <div>
      <img src={chumImg} alt="Chum Rathanakchantrai" className="team-img" />
      <h3>Ms. Chum Rathanakchantrai</h3>
      <p>Backend Developer</p>
    </div>
    <div>
      <img src={solitaImg} alt="Chhorn Solita" className="team-img" />
      <h3>Ms. Chhorn Solita</h3>
      <p>Researcher</p>
    </div>
    <div>
      <img src={sreytochImg} alt="En Sreytoch" className="team-img" />
      <img src={sreytochImg} alt="En Sreytoch" className="team-img-large" />
      <h3>Ms. En Sreytoch</h3>
      <p>Researcher</p>
    </div>
  </div>
);

export default Team;
