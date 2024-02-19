class Skill < ApplicationRecord
    has_many :user_skills
    has_many :users, through: :user_skills
    
    private
    def default_privacy_settings
      self.privacy ||= false # set default privacy to false
    end  
end
