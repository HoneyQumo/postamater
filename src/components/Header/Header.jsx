import React from 'react';
import {Col, Layout, Row} from 'antd';
import {Link, NavLink} from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <Layout.Header className="header">
      <Row className="header__main">
        <Col className="header__logo">
          <Link to="/" className="header__title">Постаматчик</Link>
        </Col>
        <Col className="header__account">
          <div className="header__button">Личный кабинет</div>
        </Col>
      </Row>
      <Row className="header__menu menu">
        <div className="menu__links">
          <NavLink to="/map" className="menu__link">Карта</NavLink>
          <NavLink to="/points-list" className="menu__link">Таблица результатов</NavLink>
        </div>
      </Row>
    </Layout.Header>
  );
};

export default Header;