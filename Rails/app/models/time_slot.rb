class TimeSlot < ActiveRecord::Base
	has_many :reservation_requests
	has_many :reservations
end
