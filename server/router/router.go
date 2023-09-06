package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/controller"
	"server/middleware"
	"server/repository"
)

func NewRouter(userRepository repository.UsersRepository, authenticationController *controller.AuthenticationController, usersController *controller.UserController) *gin.Engine {
	service := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	service.Use(cors.New(config))

	service.GET("", func(context *gin.Context) {
		context.JSON(http.StatusOK, "welcome home")
	})

	service.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	router := service.Group("/api")
	authenticationRouter := router.Group("/authentication")
	authenticationRouter.POST("/register", authenticationController.Register)
	authenticationRouter.POST("/login", authenticationController.Login)

	usersRouter := router.Group("/users")
	usersRouter.GET("", middleware.DeserializeUser(userRepository), usersController.GetUsers)

	return service
}
