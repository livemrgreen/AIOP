class TimeSlotSerializer < ActiveModel::Serializer
  attributes :id, :start, :end
end
