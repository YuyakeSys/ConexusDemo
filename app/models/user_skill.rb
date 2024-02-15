class UserSkill < ApplicationRecord
  belongs_to :users, class_name: 'User'
  belongs_to :skills, class_name: 'Skill'

  private
  def default_privacy_settings
    self.privacy ||= false # set default privacy to false
  end
end
