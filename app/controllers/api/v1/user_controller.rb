class Api::V1::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:restricted]

  def restricted
    devise_api_token = current_devise_api_token 
    if devise_api_token
        render json: {message: "login as #{devise_api_token}"}, status: ok
    else
        render json: {message: 'You are not logged in'}, status: unauthen
end
