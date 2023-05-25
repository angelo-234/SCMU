package pt.unl.fct.di.smartbathroom.presistence

import pt.unl.fct.di.smartbathroom.domain.SlotsDAO
import org.springframework.data.repository.CrudRepository

interface SlotRepository: CrudRepository<SlotsDAO, Long> {
}