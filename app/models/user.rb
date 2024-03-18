class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api

  # one to many relation ships:
  # skills | projects
  has_many :user_skills, foreign_key: 'users_id'
  has_many :skills, through: :user_skills
  has_many :projects

  has_one_attached :avatar
end
