module Api
    module V1
        class SaveSkillController < ApplicationController
            skip_before_action :verify_authenticity_token, raise: false

            # Save skill to skills table
            def save_skill
                skill = Skill.new(skill_params)
                if skill.save
                    render json: { message: 'Skill saved successfully' }, status: :created
                else
                    render json: { error: 'Failed to save skill' }, status: :unprocessable_entity
                end
            end

            # Save skill to user_skill table
            def save_user_skill
                user_skill = UserSkill.new(user_skill_params)
                if user_skill.save
                    render json: { message: 'Skill saved successfully' }, status: :created
                else
                    render json: { error: 'Failed to save user_skill' }, status: :unprocessable_entity
                end
            end

            private

            # Save skill to skills table
            def skill_params 
                { skill_name: params[:value] }
            end

            # Save skill to user_skill table (user id, skill id)
            def user_skill_params 
                skill = Skill.find_by(skill_name: params[:value])
                user = params[:user_id]
                
                { skills_id: skill&.id, users_id: user } 
            end
        end
    end
end
