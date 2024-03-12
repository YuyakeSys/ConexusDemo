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
            # def save_user_skill
            #     user_skill = UserSkill.new(user_skill_params)
            #     if user_skill.save
            #         render json: { message: 'Skill saved successfully' }, status: :created
            #     else
            #         render json: { error: 'Failed to save user_skill' }, status: :unprocessable_entity
            #     end
            # end


            # Save skill to user_skill table (user id, skill id)
            def save_user_skill 
                user_id = params[:user_id]
                skills = params[:skills]
              
                user_skill_params_array = []
              
                skills.each do |skill_name|
                  skill = Skill.find_by(skill_name: skill_name)

                  if skill 
                    user_skill = UserSkill.find_by(skills_id: skill.id, users_id: user_id)
                    if !user_skill
                        user_skill_params_array << { skills_id: skill.id, users_id: user_id }
                    end
                else
                    new_skill = Skill.create(skill_name: skill_name)
                    user_skill_params_array << { skills_id: new_skill.id, users_id: user_id }
                  end
                end
                UserSkill.create(user_skill_params_array)
            end

            private

            # Save skill to skills table
            def skill_params 
                { skill_name: params[:value] }
            end
        end
    end
end
