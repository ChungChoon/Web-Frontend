import React , { Component } from "react";
import styles from "./styles.scss";
import Wallet from "components/common/Wallet";

class UserProfile extends Component {
    state = {
        showMenu: false,
        name: sessionStorage.getItem('name') || '익명'
    }

    showMenu = (event) => {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }
      
    closeMenu = (event) => {
        if (!this.dropdownMenu.contains(event.target)) {
          
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });  
          
        }
      }

    render () {
      return (
              <div className={styles.dropdown}>
              <button onClick={this.showMenu} className={styles.dropbtn}>
                  <img src={require("images/ic_people_blue56.png")} className={styles.img} alt="프로필"/>
                  <span className={styles.username}>{this.state.name}</span>
              </button>
              {
            this.state.showMenu
              ? (
                <div
                  className={styles.dropdownContent}
                  ref={(element) => {
                    this.dropdownMenu = element;
                  }}
                >
                  <div className={styles.tail}></div>
                  <div className={styles.content}>
                      <Wallet />
                  </div>
                </div>
              )
              : (null)
              }
          </div>
      );
}
}

export default UserProfile;