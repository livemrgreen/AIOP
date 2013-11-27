class ReservationRequest < ActiveRecord::Base
	belongs_to :teaching
	belongs_to :time_slot
	belongs_to :reservation

	has_and_belongs_to_many :characteristics
end
