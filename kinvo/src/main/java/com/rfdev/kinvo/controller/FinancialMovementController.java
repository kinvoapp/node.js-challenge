package com.rfdev.kinvo.controller;

import com.rfdev.kinvo.dto.FinancialMovementResponseDTO;
import com.rfdev.kinvo.service.FinancialMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/financial-movements")
public class FinancialMovementController {

  @Autowired
  private FinancialMovementService financialMovementService;

  @GetMapping(value = "/clients/{clientId}")
  public ResponseEntity<List<FinancialMovementResponseDTO>> findAllByClientId(@PathVariable Long clientId) {
    return ResponseEntity.ok().body(financialMovementService.findByClientId(clientId));
  }
}
