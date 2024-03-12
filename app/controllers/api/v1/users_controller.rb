class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def show
    user = User.find_by(id: params[:id])
    if user
      skill_names = user.skills.pluck(:skill_name)
 
      render json: { id: user.id, 
      email: user.email, 
      full_name: user.full_name, 
      education: user.education, 
      user_type: user.user_type,
      skills: skill_names,
      team_member: user.team_member, }, status: :ok
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
  users = User.all

  if params[:name].present?
    users = users.where("full_name LIKE ?", "%#{params[:name]}%")
  end

  if params[:user_type].present?
    users = users.where(user_type: params[:user_type])
  end

  users = users.limit(15)
  render json: users, only: [:id, :full_name]
end
  def get_user_brief
    user = User.select(:id, :full_name, :image_url).find_by(id: params[:id])

    if user
      render json: { id: user.id, full_name: user.full_name, image_url: user.image_url }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end



  def user_params
    # This allows the :full_name and :education attributes to be modified through the update action
    params.require(:user).permit(:full_name, :education)
  end

end
