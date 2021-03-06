import React from 'react';
import ReactTooltip from 'react-tooltip';
import translate from '../../../translate/translate';
import mainWindow from '../../../util/mainWindow';

export const WalletsNavNoWalletRender = function() {
  return (
    <div>
      <div className="col-xs-12 padding-top-20">
        <div className="alert alert-info alert-dismissible">
          <span className="font-size-24 text-align-center">
            <i className="icon fa-paw"></i> { translate('INDEX.NO_WALLET_CAPS') }
          </span>
          <br/>
          { translate('INDEX.PLEASE_SELECT_A_WALLET') }.
        </div>
      </div>
    </div>
  );
};

export const WalletsNavWithWalletRender = function() {
  const pubKeys = mainWindow.getPubkeys();

  return (
    <div>
      <div
        className={ 'page-header page-header-bordered header-fairexchange padding-bottom-40 ' + (this.props.ActiveCoin.mode === 'spv' || (pubKeys[this.props.ActiveCoin.coin.toLowerCase()] && pubKeys[this.props.ActiveCoin.coin.toLowerCase()].pub) ? 'page-header--spv' : 'page-header--native') }
        id="header-dashboard"
        style={{ marginBottom: '30px' }}>
        { this.props.ActiveCoin &&
          this.props.ActiveCoin.mode === 'spv' &&
          <div>
            <strong>{ translate('INDEX.MY') } { this.props && this.props.ActiveCoin ? this.props.ActiveCoin.coin : '-' } { translate('INDEX.ADDRESS') }: </strong>
            <span className="blur">{
              this.props &&
              this.props.Dashboard &&
              this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin] &&
              this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub ? this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub : '-'
            }</span>
            <button
              className="btn btn-default btn-xs clipboard-edexaddr"
              onClick={ () => this.copyMyAddress(this.props.Dashboard.electrumCoins[this.props.ActiveCoin.coin].pub) }>
              <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
            </button>
          </div>
        }
        { this.props.ActiveCoin &&
          this.props.ActiveCoin.coin &&
          pubKeys[this.props.ActiveCoin.coin.toLowerCase()] &&
          <div>
            <strong>{ translate('INDEX.MY') } { this.props && this.props.ActiveCoin ? this.props.ActiveCoin.coin : '-' } { translate('INDEX.ADDRESS') }: </strong>
            { pubKeys[this.props.ActiveCoin.coin.toLowerCase()].pub }
            <button
              className="btn btn-default btn-xs clipboard-edexaddr"
              onClick={ () => this.copyMyAddress(pubKeys[this.props.ActiveCoin.coin.toLowerCase()].pub) }>
              <i className="icon wb-copy"></i> { translate('INDEX.COPY') }
            </button>
          </div>
        }
        <div className="page-header-actions">
          <div id="safe_header_button">
            <button
              type="button"
              className="btn btn-info waves-effect waves-light"
              onClick={ this.toggleNativeWalletInfo }>
              <i className="icon fa-info"></i>
            </button>
            <button
              type="button"
              className="btn btn-dark waves-effect waves-light"
              onClick={ this.toggleNativeWalletTransactions }>
              <i className="icon md-view-dashboard"></i> <span className="placeholder">{ translate('INDEX.TRANSACTIONS') }</span>
            </button>
            { this.props.ActiveCoin &&
              (this.props.ActiveCoin.mode === 'native' || (this.props.ActiveCoin.mode === 'spv' && !mainWindow.isWatchOnly())) &&
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={ () => this.toggleSendCoinForm(!this.props.ActiveCoin.send) }
                disabled={ this.checkTotalBalance() <= 0 }>
                <i className="icon fa-send"></i> <span className="placeholder">{ translate('INDEX.SEND') }</span>
              </button>
            }
            <button
              type="button"
              className="btn btn-success waves-effect waves-light"
              onClick={ () => this.toggleReceiveCoinForm(!this.props.ActiveCoin.receive) }>
              <i className="icon fa-inbox"></i> <span className="placeholder">{ translate('INDEX.RECEIVE') }</span>
            </button>
            { (this.props.ActiveCoin.mode === 'spv' && mainWindow.isWatchOnly()) &&
              <span>
                <i
                  className="icon fa-question-circle settings-help"
                  data-tip={ translate('INDEX.LITE_MODE_WATCHONLY') }></i>
                <ReactTooltip
                  effect="solid"
                  className="text-top" />
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};