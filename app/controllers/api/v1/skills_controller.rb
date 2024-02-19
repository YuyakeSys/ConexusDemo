module Api
  module V1
    class SkillsController < ApplicationController
      skip_before_action :verify_authenticity_token
      def create
        @skill = Skill.new(skill_params)
        if @skill.save
          render json: @skill, status: :created
        else
          render json: @skill.errors, status: :unprocessable_entity
        end
      end

      def index
        @skills = Skill.all
        render json: @skills
      end

      private

      def skill_params
        params.require(:skill).permit(:id, :name)
      end
    end
  end
end