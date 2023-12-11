package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestHandler(t *testing.T) {
	// Arrange
	os.Setenv("NAME", "Taro")
	defer os.Unsetenv("NAME")

	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()

	// Act
	handler(rr, req)

	// Assert
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("got %v want %v", status, http.StatusOK)
	}

	expected := "Hello Taro!\n"
	if rr.Body.String() != expected {
		t.Errorf("got %v want %v", rr.Body.String(), expected)
	}
}
