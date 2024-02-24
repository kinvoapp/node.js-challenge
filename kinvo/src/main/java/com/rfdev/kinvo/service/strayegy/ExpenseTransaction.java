package com.rfdev.kinvo.service.strayegy;

import com.rfdev.kinvo.model.Client;
import com.rfdev.kinvo.service.FinancialTransaction;

import java.math.BigDecimal;

public class ExpenseTransaction implements FinancialTransaction {
  @Override
  public void makeTransaction(BigDecimal value, Client client) {
    client.setBalance(client.getBalance().subtract(value));
  }
}
