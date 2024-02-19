module Api
  module V1
    class SkillSuggestController < ApplicationController
      def index
        keyword = params[:query]
        suggestions = get_suggestions(keyword)
        render json: suggestions
      end

      private

      def get_suggestions(keyword)
        skills = Skill.where("skill_name LIKE ?", "%#{keyword}%")
        skill_names = skills.map(&:skill_name)
        return skill_names
      end      
    end
  end
end