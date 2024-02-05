class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: { id: user.id, email: user.email, fullname: user.fullname, education: user.education }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

end
