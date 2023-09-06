package service

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"server/config"
	"server/data/request"
	"server/helper"
	"server/model"
	"server/repository"
	"server/utils"
)

type AuthenticationServiceImpl struct {
	UsersRepository repository.UsersRepository
	Validate        *validator.Validate
}

func (a *AuthenticationServiceImpl) Login(users request.LoginRequest) (string, error) {
	// Find username in database
	new_users, users_err := a.UsersRepository.FindByUsername(users.Username)
	if users_err != nil {
		return "", errors.New("invalid username or Password")
	}

	config, _ := config.LoadConfig(".")

	verify_error := utils.VerifyPassword(new_users.Password, users.Password)
	if verify_error != nil {
		return "", errors.New("invalid username or Password")
	}

	// Generate Token
	token, err_token := utils.GenerateToken(config.TokenExpiresIn, new_users.Id, config.TokenSecret)
	helper.ErrorPanic(err_token)
	return token, nil
}

func (a *AuthenticationServiceImpl) Register(users request.CreateUsersRequest) {
	hashedPassword, err := utils.HashPassword(users.Password)
	helper.ErrorPanic(err)

	newUser := model.Users{
		Username: users.Username,
		Email:    users.Email,
		Password: hashedPassword,
	}
	a.UsersRepository.Save(newUser)
}

func NewAuthenticationServiceImpl(usersRepository repository.UsersRepository, validate *validator.Validate) AuthenticationService {
	return &AuthenticationServiceImpl{
		UsersRepository: usersRepository,
		Validate:        validate,
	}
}
