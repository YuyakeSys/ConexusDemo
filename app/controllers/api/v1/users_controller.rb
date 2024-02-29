class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def show
    user = User.find_by(id: params[:id])
    if user
      skill_names = user.skills.pluck(:skill_name)

      render json: { id: user.id, 
      email: user.email, 
      fullname: user.fullname, 
      education: user.education, 
      user_type: user.user_type,
      skills: skill_names }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      # Ensure the current_user is the user who is trying to make the update or is an admin
      if user.update(user_params)
        render json: { message: "User successfully updated", user: user }, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def suggestions
    if params[:name].present?
      # Basic matching, consider using ILIKE for case-insensitive matching in PostgreSQL
      users = User.where("fullname LIKE ?", "%#{params[:name]}%").limit(15)
    else
      users = User.none
    end

    render json: users, only: [:id, :fullname]
  end


  def user_params
    # This allows the :fullname and :education attributes to be modified through the update action
    params.require(:user).permit(:fullname, :education)
  end

end
