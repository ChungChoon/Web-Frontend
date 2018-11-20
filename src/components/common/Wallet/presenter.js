import React from "react";
import styles from "./styles.scss";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const style = theme => ({
  button: {
    margin: 0,
    padding: 0,
    minHeight: '25px',
    menWidth: '55px',
    borderRadius: '20px',
    backgroundColor: 'white'
  },
  icon: {
    fontSize: '1rem',
    marginLeft: '.5rem'
  }
});


const Wallet = (props) => {
      const { walletInstance, classes } = props;
      let input1 = null;
      let input2 = null;

      const copyAddressToClipboard = (e) => {
        input1.select();
        document.execCommand('copy');
        alert("copied!")
      };

      const copyPrivateToClipboard = (e) => {
        input2.select();
        document.execCommand('copy');
        alert("copied!")
      };

      if (walletInstance.address) {
        return (
          <div className={styles.walletWrapper}>
            <div className={styles.mywallet}>
              <div>내 지갑</div>
              <div>{props.getBalance}<span>KLAY</span></div>
            </div>
            <div className={styles.address}>
              <div className={styles.leftWidth}>
                <div>지갑주소</div>
                {
                  document.queryCommandSupported('copy') &&
                  <input className={styles.content} 
                value={walletInstance.address} readOnly
                ref={(input) => {input1 = input}}
                />}
              </div>
              <div>
              <Button variant="outlined" size="small" 
              color="secondary" className={classes.button}
              onClick={copyAddressToClipboard}>
                복사
              </Button>
          </div>
            </div>
            <div>
            <div className={styles.privateKey}>
            <div className={styles.leftWidth}>
                <div>개인키</div>
                {
                  document.queryCommandSupported('copy') &&
                  <input className={styles.content} 
                value={walletInstance.privateKey} readOnly
                ref={(input) => {input2 = input}}
                />}
                </div>
              <div>
              <Button variant="outlined" size="small" 
              color="secondary" className={classes.button}
              onClick={copyPrivateToClipboard}>
                복사
              </Button>
              </div>
              </div>
            </div>
          </div>
        )
    }
    return null;
}


export default withStyles(style)(Wallet);

