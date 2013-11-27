class Characteristic < ActiveRecord::Base
	has_and_belongs_to_many :reservation_requests
	has_and_belongs_to_many :rooms
end
