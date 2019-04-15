class Group < ApplicationRecord
  has_many :group_users
  has_many :users, thorgh: :group_users
  validates :name, presence: true
end
