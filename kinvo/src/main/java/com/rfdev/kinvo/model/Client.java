package com.rfdev.kinvo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "client")
public class Client implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long clientId;

  private String name;

  private BigDecimal balance;

  @OneToMany(
    mappedBy = "client",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL
  )
  private Set<FinancialMovement> financialMovements = new HashSet<>();

  public void addFinancialMovement(FinancialMovement financialMovement) {
    this.financialMovements.add(financialMovement);
  }
}
