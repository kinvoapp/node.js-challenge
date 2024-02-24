package com.rfdev.kinvo.service;

import com.rfdev.kinvo.model.Client;

import java.math.BigDecimal;

public interface FinancialTransaction {

  void makeTransaction(BigDecimal value, Client client);
}
