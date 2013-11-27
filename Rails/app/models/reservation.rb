class Reservation < ActiveRecord::Base
	belongs_to :teaching
	belongs_to :room
	belongs_to :reservation_request
	belongs_to :time_slot
end
