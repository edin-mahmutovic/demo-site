import React, { Component } from "react";
import styles from "./DynamicTable.module.scss";
import { StaticQuery, graphql } from "gatsby";

export default class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTable: "USD"
    };
  }

  setActiveTable = activeValue => () => {
    this.setState({
      activeTable: activeValue
    });
  };

  render() {
    console.log("props table: ", this.props);
    return (
      <StaticQuery
        query={graphql`
          query Table {
            allPrismicTable {
              edges {
                node {
                  lang
                  data {
                    buy {
                      text
                    }
                    buy_button {
                      text
                    }
                    change {
                      text
                    }
                    market {
                      text
                    }
                    price {
                      text
                    }
                    sell {
                      text
                    }
                    sell_button {
                      text
                    }
                    explore {
                      text
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          console.log("data", data)
          let filteredByLanguage = data.allPrismicTable.edges.filter(
            edge => edge.node.lang == this.props.language
          );
          if (filteredByLanguage.length == 0) {
            filteredByLanguage = data.allPrismicTable.edges.filter(
              edge => edge.node.lang == "en-gb"
            );
          }
          const filteredData = filteredByLanguage[0].node.data;
          return (
            <div className={styles.table_wrapper}>
              <div className={styles.table}>
                <div className={styles.switcher}>
                  <div
                    className={`${styles.switch} ${
                      this.state.activeTable === "USD" ? "activeTableTab" : ""
                    }`}
                    onClick={this.setActiveTable("USD")}
                  >
                    USD
                  </div>
                  <div
                    className={`${styles.switch} ${
                      this.state.activeTable === "BTC" ? "activeTableTab" : ""
                    }`}
                    onClick={this.setActiveTable("BTC")}
                  >
                    BTC
                  </div>
                  <div
                    className={`${styles.switch} ${
                      this.state.activeTable === "JPY" ? "activeTableTab" : ""
                    }`}
                    onClick={this.setActiveTable("JPY")}
                  >
                    JPY
                  </div>
                  {/* <div
              className={`${styles.switch} ${
                this.state.activeTable === 'CNY' ? 'activeTableTab' : ''
              }`}
              onClick={this.setActiveTable('CNY')}
            >
              CNY
            </div> */}
                </div>
                <table
                  className={`${styles.wrapper} ${this.state.activeTable ===
                    "USD" && "activeTable"}`}
                >
                  <thead>
                    <tr>
                      <th>{filteredData.market.text}</th>
                      <th>{filteredData.price.text}</th>
                      <th>{filteredData.change.text}</th>
                      <th>{filteredData.buy.text}</th>
                      <th>{filteredData.sell.text}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTCUSD</td>
                      <td id="rate_BTCUSD_mid"></td>
                      <td id="rate_BTCUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>ETHUSD</td>
                      <td id="rate_ETHUSD_mid"></td>
                      <td id="rate_ETHUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>ADAUSD</td>
                      <td id="rate_ADAUSD_mid"></td>
                      <td id="rate_ADAUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>AUDUSD</td>
                      <td id="rate_AUDUSD_mid"></td>
                      <td id="rate_AUDUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>BCHUSD</td>
                      <td id="rate_BCHUSD_mid"></td>
                      <td id="rate_BCHUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>EOSUSD</td>
                      <td id="rate_EOSUSD_mid"></td>
                      <td id="rate_EOSUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>EURUSD</td>
                      <td id="rate_EURUSD_mid"></td>
                      <td id="rate_EURUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>GBPUSD</td>
                      <td id="rate_GBPUSD_mid"></td>
                      <td id="rate_GBPUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>LTCUSD</td>
                      <td id="rate_LTCUSD_mid"></td>
                      <td id="rate_LTCUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>NEOUSD</td>
                      <td id="rate_NEOUSD_mid"></td>
                      <td id="rate_NEOUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>XAGUSD</td>
                      <td id="rate_XAGUSD_mid"></td>
                      <td id="rate_XAGUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>XAUUSD</td>
                      <td id="rate_XAUUSD_mid"></td>
                      <td id="rate_XAUUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>XRPUSD</td>
                      <td id="rate_XRPUSD_mid"></td>
                      <td id="rate_XRPUSD_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className={`${styles.wrapper} ${this.state.activeTable ===
                    "BTC" && "activeTable"}`}
                >
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Price</th>
                      <th>Change (24h)</th>
                      <th>Buy</th>
                      <th>Sell</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ADABTC</td>
                      <td id="rate_ADABTC_mid"></td>
                      <td id="rate_ADABTC_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>BCHBTC</td>
                      <td id="rate_BCHBTC_mid"></td>
                      <td id="rate_BCHBTC_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>ETHBTC</td>
                      <td id="rate_ETHBTC_mid"></td>
                      <td id="rate_ETHBTC_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>NEOBTC</td>
                      <td id="rate_NEOBTC_mid"></td>
                      <td id="rate_NEOBTC_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>XRPBTC</td>
                      <td id="rate_XRPBTC_mid"></td>
                      <td id="rate_XRPBTC_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className={`${styles.wrapper} ${this.state.activeTable ===
                    "JPY" && "activeTable"}`}
                >
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Price</th>
                      <th>Change (24h)</th>
                      <th>Buy</th>
                      <th>Sell</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTCJPY</td>
                      <td id="rate_BTCJPY_mid"></td>
                      <td id="rate_BTCJPY_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>EURJPY</td>
                      <td id="rate_EURJPY_mid"></td>
                      <td id="rate_EURJPY_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>USDJPY</td>
                      <td id="rate_USDJPY_mid"></td>
                      <td id="rate_USDJPY_change"></td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.buyButton}
                        >
                          {filteredData.buy_button.text}
                        </a>
                      </td>
                      <td>
                        <a
                          href="https://www.overbit.com/app/"
                          className={styles.sellButton}
                        >
                          {filteredData.sell_button.text}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.bottom}>
                  <a href="https://www.overbit.com/app/">{filteredData.explore.text}</a>
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }
}
