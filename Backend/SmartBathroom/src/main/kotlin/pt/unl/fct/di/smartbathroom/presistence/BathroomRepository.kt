package pt.unl.fct.di.smartbathroom.presistence

import org.springframework.data.repository.CrudRepository
import pt.unl.fct.di.smartbathroom.domain.BathroomDAO

interface BathroomRepository : CrudRepository<BathroomDAO, Long> {
}