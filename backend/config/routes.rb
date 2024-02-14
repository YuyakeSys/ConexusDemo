Rails.application.routes.draw do
  resources :startups
  resources :projects
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
            
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do 
      resources :posts
      resources :projects
      resources :users 
    end 
  end 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end