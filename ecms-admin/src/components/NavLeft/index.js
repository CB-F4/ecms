import React from 'react';
import { connect } from "react-redux";
import ContentMenu from './ContentMenu';
import { NavLeft } from "./style";

const styles = {
  logo: {
    height: '56px',
  }
}

class SiderBar extends React.Component {
  render () {
    return (
      <NavLeft>
        <div style={styles.logo}>
          <span style={{
            display: 'block',
            lineHeight: '54px',
            textAlign: 'center',
            color: '#a0c334',
            fontWeight: '700',
            fontSize: '24px',
            borderBottom: '2px solid #a0c334'
          }}>
            ECMS
          </span>
        </div>
        <ContentMenu menus={this.props.menu} />
      </NavLeft>
    )
  }
}

const mapStateToProps = (state) => ({
  menu: JSON.parse(sessionStorage.getItem('menu')) ||　state.getIn(['login', 'menu'])
});


export default connect(mapStateToProps, null)(SiderBar);