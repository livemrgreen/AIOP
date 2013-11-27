class Teaching < ActiveRecord::Base
	belongs_to :teacher
	belongs_to :lesson
	belongs_to :group
	belongs_to :reservation

	has_many :reservation_requests
end
