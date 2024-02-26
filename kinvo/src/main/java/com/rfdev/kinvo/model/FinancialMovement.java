package com.rfdev.kinvo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class FinancialMovement implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long financialMovementId;

  private String typeOfMovement;

  private BigDecimal transactionValue;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "clientId")
  private Client client;

  private LocalDateTime createdAt;
}
