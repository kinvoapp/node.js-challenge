package com.rfdev.kinvo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FinancialMovementRequestDTO implements Serializable {

  private Long financialMovementId;

  @NotBlank(message = "Type of Movement id Mandatory! (income and expenses)")
  private String typeOfMovement;

  @Positive
  @NotNull
  private BigDecimal transactionValue;
}
