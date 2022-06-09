import logo from "./logo.svg";
import "./App.css";
import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
  PublicKey,
} from "@hashgraph/sdk";

function App() {
  const sendMoney = async () => {
    const myAccountId = "0.0.34185346";
    const compressedPublicKey =
      "0343c0ab255a01b8455fe4b14542ed9f5fa46cd1510f1034124420e74a47e92213";
    const accountId = PublicKey.fromString(compressedPublicKey).toAccountId(
      0,
      0
    );

    const myPrivateKey =
      "302e020100300506032b6570042204208f928905b01db1a212f1733f6d6fe60e858497316f2ccf06312d210d64386d77";
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    console.log("acc id ", accountId);

    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(accountId, Hbar.fromTinybars(1100)) //Receiving account
      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1100)) //Sending account
      .execute(client);

    const transactionReceipt = await sendHbar.getReceipt(client);

    console.log(
      "The transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={sendMoney}>Send money</button>
      </header>
    </div>
  );
}

export default App;
