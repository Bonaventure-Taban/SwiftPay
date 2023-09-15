document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const accountInfo = urlParams.get('accountInfo');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const add = document.getElementById('add');

    if (accountInfo) {
        welcomeMessage.textContent = `Welcome: ${accountInfo}`;
        add.textContent = `Address: ${accountInfo}`;
    }
});

let contract;

$(document).ready(function() {
    web3 = new Web3(web3.currentProvider);

    let address = "0x8b24f229D632851b19Ee6aC525000d79Cc5c1471";
    let abi = 
    [
        {
            "inputs": [
                {
                    "internalType": "int256",
                    "name": "amt",
                    "type": "int256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "int256",
                    "name": "amt",
                    "type": "int256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "int160",
                    "name": "",
                    "type": "int160"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    contract = new web3.eth.Contract(abi, address);

    contract.methods.getBalance().call().then(function(bal){
        $('#balance').html(bal);
    })

    $('#deposit').click(function(){
        let amt = parseInt($('#amount').val());

        web3.eth.getAccounts().then(function(accounts){
            let acc = accounts[0];
            return contract.methods.deposit(amt).send({from: acc});
        }).then(function(tx){
            console.log(tx);
        }).catch(function(tx){
            console.log(tx);
        })
    })

    $('#withdraw').click(function(){
        let amt = parseInt($('#amount').val());

        web3.eth.getAccounts().then(function(accounts){
            let acc = accounts[0];
            return contract.methods.withdraw(amt).send({from: acc});
        }).then(function(tx){
            console.log(tx);
        }).catch(function(tx){
            console.log(tx);
        })
    })
});




