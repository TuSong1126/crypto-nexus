// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
  uint256 transactionCount;

  event Transfer(
    address from,
    address receiver,
    uint amount,
    string message,
    uint256 timestamp,
    string keyword
  );

  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] transactions;

  // 添加交易到区块链
  function addToBlockchain(
    address payable receiver,
    uint amount,
    string memory message,
    string memory keyword
  ) public {
    transactionCount += 1;

    transactions.push(
      TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword)
    );

    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  // 所有交易的结果数组
  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  // 交易的数量
  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}
