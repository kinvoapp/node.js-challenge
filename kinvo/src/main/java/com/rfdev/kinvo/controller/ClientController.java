package com.rfdev.kinvo.controller;

import com.rfdev.kinvo.dto.ClientRequestDTO;
import com.rfdev.kinvo.dto.ClientResponseDTO;
import com.rfdev.kinvo.dto.FinancialMovementRequestDTO;
import com.rfdev.kinvo.dto.FinancialMovementResponseDTO;
import com.rfdev.kinvo.service.ClientService;
import com.rfdev.kinvo.service.FinancialMovementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/clients")
public class ClientController {

  @Autowired
  private ClientService service;

  @Autowired
  private FinancialMovementService financialMovementService;

  @GetMapping
  public ResponseEntity<Page<ClientResponseDTO>> findAll(Pageable pageable) {
    // PARAMETROS: page, size e sort
    Page<ClientResponseDTO> list = service.findAllPaged(pageable);
    return ResponseEntity.ok().body(list);
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ClientResponseDTO> findById(@PathVariable Long id) {
    ClientResponseDTO dto = service.findById(id);
    return ResponseEntity.ok().body(dto);
  }

  @PostMapping
  public ResponseEntity<ClientResponseDTO> insert(@Valid @RequestBody ClientRequestDTO dto) {
    ClientResponseDTO newDto = service.insert(dto);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newDto.getClientId()).toUri();
    return ResponseEntity.created(uri).body(newDto);
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ClientResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ClientRequestDTO dto) {
    ClientResponseDTO newDto = service.update(id, dto);
    return ResponseEntity.ok().body(newDto);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ClientResponseDTO> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{id}/financial-movements")
  public ResponseEntity<FinancialMovementResponseDTO> transaction(
    @PathVariable Long id,
    @Valid @RequestBody FinancialMovementRequestDTO dto) {
    FinancialMovementResponseDTO newDto = financialMovementService.transaction(id, dto);
    return ResponseEntity.ok().body(newDto);
  }
}
