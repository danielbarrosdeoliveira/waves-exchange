import { Signer } from "@waves/signer";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { invokeScript } from "@waves/waves-transactions/dist/transactions/invoke-script";

const buttonElementConnectWallet = document.getElementById("connect-wallet");
const buttonElementInvokeScript = document.getElementById("invokeScript");

const signer = new Signer({
  NODE_URL: "https://nodes-testnet.wavesnodes.com/",
});
signer.setProvider(new ProviderCloud());

buttonElementConnectWallet.addEventListener("click", () => {
  loginToWaves();
});

buttonElementInvokeScript.addEventListener("click", () => {
  transactionTest();
});

function transactionTest() {
  const teste = invokeScript(
    {
      dApp: "3N2UHMQamLD278mQK9BjEVWuH9f5fQ73pLC",
      chainId: "T",
      call: {
        function: "tellme",
        args: [
          {
            type: "string",
            value: "Whats your name?",
          },
        ],
      },
    },
    "8LiPrvutNxZrJzUneBSjGqSnt9yML8fGxDyt4VhcKX8A"
  );
}

async function loginToWaves() {
  buttonElementConnectWallet.disabled = true;

  const user = getUserOnLocalStorage();

  if (!user) {
    try {
      const user = await signer.login();

      setUserOnLocaStorage(user);
      setInfoUserOnHTML(user);
    } catch (error) {
      const divElementInfoUser = document.getElementById("info-user");
      divElementInfoUser.innerHTML = `
        <p class="error">Ocorreu um erro: </p>
        <span>${error}</span>
    `;
    }
  } else {
    setInfoUserOnHTML(user);
  }

  buttonElementConnectWallet.disabled = false;
}

function getUserOnLocalStorage() {
  const user = localStorage.getItem("user");

  if (!user) {
    return false;
  }

  const userLocalStorageParsed = JSON.parse(user);
  return userLocalStorageParsed;
}

function setInfoUserOnHTML(user) {
  const divElementInfoUser = document.getElementById("info-user");
  divElementInfoUser.innerHTML = `
      <p>Adress: <span>${user.address}</span></p>
      <p>PublicKey: <span>${user.publicKey}</span></p>
    `;
}

function setUserOnLocaStorage(user) {
  const userParseJson = JSON.stringify(user);
  localStorage.setItem("user", userParseJson);
}

// DEFINIR O ANO ATUAL NO FOOTER
const year = document.getElementById("actual-year");
const actualYear = new Date();

year.innerHTML += actualYear.getFullYear();
