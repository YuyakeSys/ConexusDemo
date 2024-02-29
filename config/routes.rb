Rails.application.routes.draw do
  get 'skills/create'
  resources :projects
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do 
      resources :skills, only: [:create, :index]
      get '/suggestions', to: 'skill_suggest#index'
      post '/saveUserSkill', to: 'save_skill#save_user_skill'
      post '/saveSkill', to: 'save_skill#save_skill'
      get '/member/suggestions', to: 'users#suggestions' 
      resources :posts
      resources :projects
      resources :users
    end 
  end 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
