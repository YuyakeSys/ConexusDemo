class Startup < ApplicationRecord
  belongs_to :user
  before_save :default_privacy_settings

  private
  def default_privacy_settings
    self.privacy ||= false # set default privacy to false
  end

end
