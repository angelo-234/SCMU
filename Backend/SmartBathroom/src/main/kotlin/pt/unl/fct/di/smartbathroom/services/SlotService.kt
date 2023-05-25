package pt.unl.fct.di.smartbathroom.services

import pt.unl.fct.di.smartbathroom.domain.SlotsDAO
import pt.unl.fct.di.smartbathroom.presistence.SlotRepository
import org.springframework.stereotype.Service

@Service
class SlotService(val slots: SlotRepository) {

    fun getSlot(sid:Long): SlotsDAO {
        if(!slots.existsById(sid))
            throw RuntimeException("nao existe este sid")
        return slots.findById(sid).orElseThrow()
    }

    fun reserveSlot(sid: Long, code: String){
        val slot = slots.findById(sid)
        slots.save(SlotsDAO(slot.get().id,slot.get().bathroomId,slot.get().start,slot.get().end,false,code))
    }

    fun unreserveSlot(sid: Long){
        val slot = slots.findById(sid)
        slots.save(SlotsDAO(slot.get().id,slot.get().bathroomId,slot.get().start,slot.get().end,true,""))
    }

    fun getAll(): Iterable<SlotsDAO> = slots.findAll()
}