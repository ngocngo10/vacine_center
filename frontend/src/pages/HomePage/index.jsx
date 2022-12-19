import React from 'react';
import Container from '../../layout/Container';

import './index.css';

const HomePage = () => {
  return (
    <div>
      <section className="welcome-section">
        <Container>
          <h2 className="home-page-title">
            Chào mừng bạn đến với trung tâm tiêm chủng của chúng tôi!
          </h2>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
