package com.rfdev.kinvo.controller.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ValidationError implements Serializable {

  private Integer status;
  private String error;
  private List<FieldMessage> errors = new ArrayList<>();
  private String path;

  public void addError(String fieldName, String message) {
    errors.add(new FieldMessage(fieldName, message));
  }
}
