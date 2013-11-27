class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :date, :time_slot_id, :room_id, :teaching_id
end
