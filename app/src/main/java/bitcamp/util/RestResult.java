package bitcamp.util;

import bitcamp.backend.register.vo.NaverMember;

public class RestResult {
  String status;
  String errorCode;
  Object data;
  String message;
  Object photo;
  NaverMember naverMember;

  public Object getPhoto() {
    return photo;
  }
  public RestResult setPhoto(Object photo) {
    this.photo = photo;
    return this;
  }
  public String getStatus() {
    return status;
  }
  public RestResult setStatus(String status) {
    this.status = status;
    return this;
  }
  public String getErrorCode() {
    return errorCode;
  }
  public RestResult setErrorCode(String errorCode) {
    this.errorCode = errorCode;
    return this;
  }
  public Object getData() {
    return data;
  }
  public RestResult setData(Object data) {
    this.data = data;
    return this;
  }
  public String getMessage() {
    return message;
  }
  public RestResult setMessage(String message) {
    this.message = message;
    return this;
  }
	public NaverMember getNaverMember() {
		return naverMember;
	}
	public RestResult setNaverMember(NaverMember member) {
		this.naverMember = member;
	    return this;
	}
  
  
}
